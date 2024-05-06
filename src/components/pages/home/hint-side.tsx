import Link from 'next/link';
import React from 'react';

type hintDatatype = {
    id: number;
    name: string;
};

export const HintSide = () => {
    const data: hintDatatype[] = [
        {
            id: 1,
            name: 'Bình giữ nhiệt Lock Lock',
        },
        {
            id: 2,
            name: 'Áo thun nam',
        },
        {
            id: 3,
            name: 'Levents',
        },
        {
            id: 4,
            name: 'Chuột không dây',
        },
        {
            id: 5,
            name: 'Bàn phím',
        },
    ];

    return (
        <div className="p-2">
            <h3 className="font-bold p-2 text-xl md:text-2xl">🔥 Just For You</h3>
            <ul className="p-4 pl-10 pt-0 flex flex-wrap gap-3">
                {data.map((element) => 
                    <li key={element.id} className="p-1 hover:text-primary text-sm">
                        <Link href="">{element.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
};
