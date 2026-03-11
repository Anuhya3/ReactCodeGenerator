import { parseComponentTree, TreeNode } from "../utils/parseTree";

function TreeItem({ node, path }: { node: TreeNode; path: string }) {
  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
        {node.name}
      </div>
      {node.children.length > 0 && (
        <div className="ml-4 space-y-2 border-l border-dashed border-slate-300 pl-4 dark:border-slate-700">
          {node.children.map((child, index) => (
            <TreeItem key={`${path}-${index}`} node={child} path={`${path}-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ComponentTree({ tree }: { tree?: string | null }) {
  const nodes = parseComponentTree(tree);

  if (!nodes.length) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Component tree will appear here after generation.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {nodes.map((node, index) => (
        <TreeItem key={`root-${index}`} node={node} path={`root-${index}`} />
      ))}
    </div>
  );
}
