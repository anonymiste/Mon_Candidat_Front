import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        // element: <Login />,
    },
    {
        path: "/tasks",
        children: [
            // {
            //     index: true,
            //     element: <TasksList />
            // },
            // {
            //     path: "create",
            //     element: <TasksCreate />
            // },
            // {
            //     path: ":id/edit",
            //     element: <TasksEdit />
            // },
            // {
            //     path: ":id/show",
            //     element: <TasksShow />
            // },
        ]
    }

])

const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router