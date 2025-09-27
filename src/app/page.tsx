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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⚾ MLB Players Manager</h1>
          <p className="text-gray-600">Manage your baseball players and their home run statistics</p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Player</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Player Name" 
              value={form.name} 
              onChange={(e)=> setForm({...form, name: e.target.value})} 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
              required
            />
            <input 
              type="text" 
              placeholder="Team" 
              value={form.team} 
              onChange={(e)=> setForm({...form, team: e.target.value})} 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
              required 
            />
            <input 
              type="number" 
              placeholder="Home Runs" 
              value={form.homeruns === 0 ? "" : form.homeruns} 
              onChange={(e)=> setForm({...form, homeruns: e.target.value === "" ? 0 : Number(e.target.value)})} 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
              required
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              ➕ Add Player
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">Players List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Runs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {players.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <span className="text-4xl mb-2">⚾</span>
                        <p className="text-lg">No players added yet</p>
                        <p className="text-sm">Add your first player using the form above</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  players.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{p.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{p.team}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-blue-600">{p.homeruns}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button 
                            onClick={()=> p.id && handleUpdate(p.id, p.homeruns + 1)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors duration-200"
                          >
                            +1 HR
                          </button>
                          <button 
                            onClick={()=> p.id && handleUpdate(p.id, p.homeruns - 1)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors duration-200"
                          >
                            -1 HR
                          </button>
                          <button 
                            onClick={()=> p.id && handleDelete(p.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


