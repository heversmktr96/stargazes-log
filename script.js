const status = document.querySelector("#status");
const repositoryList = document.querySelector("#repositories");

function createRepositoryItem(repository) {
  const item = document.createElement("li");
  item.className = "repository";

  const heading = document.createElement("h2");
  const link = document.createElement("a");
  link.href = repository.url;
  link.textContent = `${repository.owner}/${repository.name}`;
  heading.append(link);

  const description = document.createElement("p");
  description.textContent = repository.description;

  const metadata = document.createElement("p");
  metadata.className = "repository-meta";
  metadata.textContent = `★ Starred ${repository.starredAt} · ${repository.language}`;

  item.append(heading, description, metadata);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list");
    }

    repositoryList.replaceChildren(...repositories.map(createRepositoryItem));
    status.textContent = repositories.length
      ? `${repositories.length} starred repositories`
      : "No starred repositories yet.";
  } catch (error) {
    status.textContent = "Could not load starred repositories.";
    console.error("Could not load events.json:", error);
  }
}

loadRepositories();
