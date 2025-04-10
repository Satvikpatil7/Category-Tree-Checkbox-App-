# 🗂️ Category Tree (Checkbox App)

Simple React app to display nested checkboxes using recursion. Selecting a parent selects all its children, and selecting all children checks the parent.

## 🧠 Logic

- Uses **recursion** to render nested checkboxes from a tree-like data structure.
- When a checkbox is toggled:
  - All of its **child nodes are updated** accordingly.
  - A **recursive check** updates parent nodes if all children are selected.

✅ Auto-propagates checkbox states both **downward (children)** and **upward (parents)**.

## 🛠 Stack
- React
- JavaScript
- pnpm

## ▶️ Run

```bash
pnpm install
pnpm run dev
```

Visit: http://localhost:5173
