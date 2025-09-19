

## README — Quick steps to run


1. Create a new rsbuild React project (recommended):


```bash
# interactive starter that installs correct rsbuild packages
npm create rsbuild@latest my-todo
cd my-todo
```


2. Replace the generated `index.html` and `src` files with the files above (or copy the `src` contents into your project).
3. Install deps (if not already):


```bash
npm install
```


4. Start dev server:


```bash
npm run dev
# open http://localhost:5173 (or the port rsbuild shows)
```


5. Build for production:


```bash
npm run build
npm run preview
```


---


### Notes & ideas for improvement
- Replace `localStorage` with a backend API to persist across devices.
- Add filtering (active/completed), bulk actions, or drag-and-drop reordering.
- Add unit tests and E2E tests.


---


That's the complete small Todo app ready to run with rsbuild. Copy the files into your rsbuild project and `npm run dev` to try it.