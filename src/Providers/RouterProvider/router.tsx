import { createBrowserRouter, RouterProvider } from "react-router";
import CandidatListe from "../../pages/candidats/candidat.liste";
import CandidatCreate from "../../pages/candidats/candidat.create";
import CandidatEdit from "../../pages/candidats/candidat.edit";
import CandidatShow from "../../pages/candidats/candidat.show";

const router = createBrowserRouter([
    
    {
        path: "/",
        children: [
            {
                index: true,
                element: <CandidatListe />
            },
            {
                path: "candidates/create",
                element: <CandidatCreate />
            },
            {
                path: "candidates/:id/edit",
                element: <CandidatEdit />
            },
            {
                path: "candidates/:id/show",
                element: <CandidatShow />
            },
        ]
    }

])

const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router