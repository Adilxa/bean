import { Card } from "antd"
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
    title: string;
    text: string;
    actions?: ReactNode[]
    loading: boolean
}


export const TaskCard = ({ title, text, actions, loading }: Props) => {
    return (
        <Card style={{ width: 800 }} loading={loading} title={title} actions={actions} extra={<Link to="/">Back</Link>} >
            {text}
        </Card>
    )
}