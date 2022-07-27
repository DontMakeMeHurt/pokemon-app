import React, { useEffect, useState } from 'react';
import { Detail } from '../App';

interface Props {
    viewDetail: Detail;
    setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
    name: string;
    id: number;
    image: string
    abilities: {
        name: string,
        ability: string
    }[] | undefined;
}

const PokemonList: React.FC<Props> = (props) => {
    const { name, image, id, abilities, viewDetail, setViewDetail } = props;
    const [isSelected, setSelected] = useState(false);
    const hidePokemon = () => {
        if(viewDetail) {
            setViewDetail({
                id: 0,
                isOpened: false
            }
            )
        }
    }
        
    useEffect(() => {
        setSelected(id === viewDetail?.id)
    }, [viewDetail])
    
    return (
        <div className="">
            {isSelected ? (
                <section className="pokemon-list-detailed">
                    <div className="detail-container">
                        <p className="detail-close" onClick={hidePokemon}>
                            X
                        </p>
                        <div className="detail-info">
                            <img src={image} alt="pokemon" className="detail-img" />
                            <p className="detail-name">{name}</p>
                        </div>
                        <div className="detail-skill">
                            <p className="detail-ability">
                                Abilities:
                            </p>
                            {abilities?.map((ab:any) => {
                                return (
                                    <div className="">{ab.ability.name}</div>
                                )
                            })}
                        </div>
                    </div>    
                </section>
            ) : (
                <section className="pokemon-list-container">
                <p className="pokemon-name">{name}</p>
                <img src={image} alt="pokemon" />
            </section>
            )}
            
        </div>
    )
}

export default PokemonList