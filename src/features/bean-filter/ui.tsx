import { Radio } from "antd";
import { QueryParams } from "../../shared/api/beens/model";
import { buttons } from "./config";

const { Button, Group } = Radio;

type Props = {
    onChange: (params: QueryParams) => void;
}

export const BeanFilter = ({ onChange }: Props) => {
    return (
        <Group defaultValue={"all"}>
            {buttons.map((el) => (
                <Button value={el.id} key={el.id} onClick={() => onChange(el.params)}>
                    {el.title}
                </Button>
            ))}
        </Group>
    );
}
