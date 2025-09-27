"use client";

import { useEffect, useState, FormEvent } from "react";
import { addPlayer, getPlayers, updatePlayer, deletePlayer } from "../../lib/players";
import { Player } from "../../types/player";

export default function Home() {

  const [players, setPlayers] = useState<Player[]>([]);
  const [form, setForm] = useState<Omit<Player, "id">>({
    name: "",
    team: "",
    homeruns: 0
  })


  const loadPlayers = async () => {
    const data = await getPlayers()
    setPlayers(data)
  }

  useEffect(()=> {
    loadPlayers()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addPlayer(form);
    setForm({
      name: "",
      team: "",
      homeruns: 0
    })
    loadPlayers()
  }

  const handleUpdate = async (id: string, newHomeruns: number) =>{
    await updatePlayer(id, { homeruns: newHomeruns });
    loadPlayers();
  }

  const handleDelete = async (id: string) => {
    await deletePlayer(id);
    loadPlayers();
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre"  value={form.name} onChange={(e)=> setForm({...form, name: e.target.value})} required/>
        <input type="text" placeholder="Equipo"  value={form.team} onChange={(e)=> setForm({...form, team: e.target.value})} required />
        <input type="number" placeholder="Home Runs"  value={form.homeruns === 0 ? "" : form.homeruns} onChange={(e)=> setForm({...form, homeruns: e.target.value === "" ? 0 : Number(e.target.value)})} required/>
        <button type="submit">Agregar</button>
      </form>

      {/* TABLE */}
      <table className="w-full">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Equipo</th>
            <th>HomeRuns</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.team}</td>
              <td>{p.homeruns}</td>
              <td>
                <button onClick={()=> p.id && handleUpdate(p.id, p.homeruns + 1)}>+HR</button>
                <button onClick={()=> p.id && handleUpdate(p.id, p.homeruns - 1)}>-HR</button>
                <button onClick={()=> p.id && handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>

    </div>
  );
}


