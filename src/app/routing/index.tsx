import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../shared/ui/main-layout";
import { BeanListPage } from "../../pages/bean-list-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <BeanListPage />
            },
            {
                path: ":id",
                element: <div>hello world</div>
            }
        ]
    }
])