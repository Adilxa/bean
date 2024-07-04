import { Checkbox, Spin } from "antd"
import { taskModel } from "../../entities/task"
import { Todo } from "../../shared/api/todos/model"

type Props = {
    todo: Todo
}

export const ToggleTask = ({ todo }: Props) => {
    const { store: { updateTodo, isUpdateLoading } } = taskModel

    if (isUpdateLoading) {
        return <Spin />
    }
    return (
        <Checkbox onChange={(val) => updateTodo({ ...todo, completed: val.target.checked })}></Checkbox>
    )
}