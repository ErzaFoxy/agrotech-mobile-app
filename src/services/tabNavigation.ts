let pendingTabIndex: number | null = null;

export const setPendingTabIndex = (index: number) => {
  pendingTabIndex = index;
};

export const consumePendingTabIndex = () => {
  const temp = pendingTabIndex;
  pendingTabIndex = null;
  return temp;
};