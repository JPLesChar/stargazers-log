const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

function renderRepositories(events) {
  const starredEvents = events.filter((event) => event.type === "starred");

  for (const event of starredEvents) {
    const item = document.createElement("li");
    item.className = "repository";

    const link = document.createElement("a");
    link.href = event.repository.url;
    link.textContent = event.repository.name;

    const description = document.createElement("p");
    description.textContent = event.repository.description;

    const date = document.createElement("time");
    date.dateTime = event.starred_at;
    date.textContent = `Starred on ${new Date(`${event.starred_at}T00:00:00`).toLocaleDateString()}`;

    item.append(link, description, date);
    repositoryList.append(item);
  }

  statusMessage.textContent = starredEvents.length
    ? `${starredEvents.length} starred repositories`
    : "No starred repositories found.";
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load events (${response.status}).`);
    }

    const events = await response.json();
    if (!Array.isArray(events)) {
      throw new Error("The events data is not a list.");
    }

    renderRepositories(events);
  } catch (error) {
    statusMessage.textContent = "Could not load starred repositories. Please try again later.";
    console.error(error);
  }
}

loadRepositories();
