import { useState } from 'react';

export default function AddPoll() {
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(optionOne, optionTwo)
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">
        Would You Rather
      </h1>

      <h3>Create Your Own Poll</h3>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <label>First Option</label>
        <input
          type="text"
          placeholder="Option One"
          value={optionOne}
          onChange={(e) =>
            setOptionOne(e.target.value)
          }
          className="w-full border rounded p-3"
        />

        <label>Second Option</label>
        <input
          type="text"
          placeholder="Option Two"
          value={optionTwo}
          onChange={(e) =>
            setOptionTwo(e.target.value)
          }
          className="w-full border rounded p-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  )
}