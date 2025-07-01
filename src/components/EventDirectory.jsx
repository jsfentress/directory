/** @jsxImportSource preact */
import { useState, useMemo } from 'preact/hooks';

export default function EventDirectory({ events, tags }) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');

  // Filter events by search and genre
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase()) ||
        (event.description || '').toLowerCase().includes(search.toLowerCase()) ||
        (event.price || '').toLowerCase().includes(search.toLowerCase()) ||
        (event.genre || []).some(g => g.toLowerCase().includes(search.toLowerCase()));
      const matchesTag =
        activeTag === '' || (event.genre || []).includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [events, search, activeTag]);

  // Sort and group events by date
  const groupedEvents = useMemo(() => {
    // Sort by date ascending using string comparison
    const sorted = [...filteredEvents].sort((a, b) => a.date.localeCompare(b.date));
    // Group by date string (MM/DD/YYYY)
    return sorted.reduce((acc, event) => {
      const [year, month, day] = event.date.split('-');
      const dateKey = `${month}/${day}/${year}`;
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [filteredEvents]);

  
  const dateKeys = useMemo(() => Object.keys(groupedEvents), [groupedEvents]);

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
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? '' : tag)}
              class={`px-3 py-1 rounded border text-sm ${
                tag === activeTag
                  ? 'bg-indigo-700 text-white'
                  : 'bg-white text-indigo-700 border-indigo-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {dateKeys.length === 0 && (
        <p class="text-gray-500 italic text-center mt-8">No events found.</p>
      )}

      <div class="space-y-8 mt-8">
        {dateKeys.map(dateKey => (
          <section key={dateKey} aria-label={dateKey}>
            <div class="flex items-center my-6">
              <div class="flex-grow border-t border-gray-300"></div>
              <span class="mx-4 px-4 py-1 bg-white text-xs uppercase font-semibold tracking-wide text-gray-500 shadow-sm">
                {dateKey}
              </span>
              <div class="flex-grow border-t border-gray-300"></div>
            </div>
            <ul class="space-y-3">
              {groupedEvents[dateKey].map(event => (
                <li key={event.id} class="list-none">
                  <div class="border p-4 rounded shadow-sm hover:shadow-md transition bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 class="text-lg font-bold">{event.title}</h2>
                      <p class="text-sm text-gray-600">
                        {event.venue} — {event.date ? `${event.date.split('-')[1]}/${event.date.split('-')[2]}/${event.date.split('-')[0]}` : ''}
                      </p>
                      <div class="flex flex-wrap gap-2 mb-1">
                        {(event.genre || []).map(g => (
                          <span key={g} class="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full font-medium">
                            {g}
                          </span>
                        ))}
                      </div>
                      <p class="text-xs italic text-gray-500">{event.price}</p>
                      <p class="mt-2 text-sm">{event.description}</p>
                    </div>
                    <div class="flex-shrink-0 flex items-center justify-end">
                      <button class="ml-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition shadow" disabled>
                        Get Tickets
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
} 