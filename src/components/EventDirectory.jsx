/** @jsxImportSource preact */
import { useState } from 'preact/hooks';

export default function EventDirectory({ events, tags }) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const filtered = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase()) ||
      (event.description || '').toLowerCase().includes(search.toLowerCase());

    const matchesTag =
      activeTag === '' || event.vibe.includes(activeTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row items-center gap-4 justify-between">
        <input
          type="text"
          placeholder="Search events…"
          class="w-full sm:w-1/2 px-4 py-2 border rounded"
          value={search}
          onInput={e => setSearch(e.target.value)}
        />

        <div class="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              onClick={() => setActiveTag(tag === activeTag ? '' : tag)}
              class={`px-3 py-1 rounded border text-sm ${
                tag === activeTag
                  ? 'bg-black text-white'
                  : 'bg-white text-black border-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <ul class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(event => (
          <li class="border p-4 rounded shadow-sm hover:shadow-md transition">
            <h2 class="text-lg font-bold">{event.title}</h2>
            <p class="text-sm text-gray-600">
              {event.venue} — {new Date(event.date).toLocaleDateString()}
            </p>
            <p class="text-xs italic text-gray-500">{event.vibe.join(', ')}</p>
            <p class="mt-2 text-sm">{event.description}</p>
          </li>
        ))}
        {filtered.length === 0 && (
          <p class="text-gray-500 italic col-span-full text-center">No events found.</p>
        )}
      </ul>
    </div>
  );
} 