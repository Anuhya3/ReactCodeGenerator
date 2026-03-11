export type TreeNode = {
  name: string;
  children: TreeNode[];
};

export function parseComponentTree(tree?: string | null): TreeNode[] {
  if (!tree) return [];
  const lines = tree
    .split(/\r?\n/)
    .map((line) => line.replace(/\t/g, "  "))
    .filter((line) => line.trim().length > 0);

  const root: TreeNode = { name: "root", children: [] };
  const stack: { node: TreeNode; indent: number }[] = [
    { node: root, indent: -1 },
  ];

  for (const line of lines) {
    const indent = line.match(/^\s*/)?.[0]?.length ?? 0;
    const name = line.trim().replace(/^[\-•]+\s*/, "");
    const node: TreeNode = { name, children: [] };

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    stack[stack.length - 1].node.children.push(node);
    stack.push({ node, indent });
  }

  return root.children;
}
