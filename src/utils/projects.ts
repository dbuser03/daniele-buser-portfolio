export const getGridColumnCount = (element: HTMLElement): number => {
  const gridColumns = getComputedStyle(element).gridTemplateColumns;
  return gridColumns.split(/\s+/).length;
};

export const findMostVisibleProject = (
  visibilityMap: Map<string, number>,
): string | null => {
  let mostVisibleId: string | null = null;
  let highestVisibility = 0;

  visibilityMap.forEach((visibility, id) => {
    if (visibility > highestVisibility) {
      highestVisibility = visibility;
      mostVisibleId = id;
    }
  });

  return mostVisibleId;
};

export const updateVisibilityMap = (
  entries: IntersectionObserverEntry[],
  visibilityMap: Map<string, number>,
): void => {
  entries.forEach((entry) => {
    const projectId = entry.target.getAttribute("data-project-id");
    if (projectId) {
      visibilityMap.set(projectId, entry.intersectionRatio);
    }
  });
};
