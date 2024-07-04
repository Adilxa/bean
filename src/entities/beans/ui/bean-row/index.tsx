import { Card, Tag } from "antd";
import { useMemo } from 'react';

type Props = {
    description: string;
    beanId: number | string;
    groupName: string[];
    ingredients: string[];
    flavorName: string;
    colorGroup: string;
    backgroundColor: string;
    imageUrl: string;
    glutenFree: boolean;
    sugarFree: boolean;
    seasonal: boolean;
    kosher: boolean;
}

export const BeanRow = ({
    groupName,
    flavorName,
    backgroundColor,
    imageUrl,
    glutenFree,
    sugarFree,
    seasonal,
    kosher
}: Props) => {
    const cardStyle = useMemo(() => ({
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.02)',
        },
        width: "100%",
        backgroundColor: backgroundColor || "#fff",
        display: "flex"
    }), [backgroundColor]);

    const contentStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const infoStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'flex-start',
    };

    const tags = [
        glutenFree && <Tag color="green" key="glutenFree">Gluten Free</Tag>,
        sugarFree && <Tag color="blue" key="sugarFree">Sugar Free</Tag>,
        seasonal && <Tag color="orange" key="seasonal">Seasonal</Tag>,
        kosher && <Tag color="gold" key="kosher">Kosher</Tag>,
    ].filter(Boolean);

    return (
        <Card style={cardStyle} >
            <img alt={flavorName} src={imageUrl} style={{ height: '200px', width: "300px", objectFit: 'cover' }} />
            <div style={contentStyle}>
                <div style={infoStyle}>
                    <h3 style={{ margin: 0, color: "white", textShadow: " 0 0 3px #494949, 0 0 5px #494949" }}>{flavorName}</h3>
                    <div style={{ marginTop: '8px', flexDirection: "column", display: "flex", gap: 4 }}>
                        {tags}
                        {groupName.map(name => (
                            <Tag key={name} color="geekblue">{name}</Tag>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
