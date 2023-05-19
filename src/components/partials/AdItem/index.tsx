import { Item } from './styled';
import { Link } from 'react-router-dom';

type PropsType = {
    data: {
        id: string,
        title: string,
        price: number,
        priceNegotiable: boolean,
        image: string
    }
}

const AdItem = (props:PropsType)=>{
    let price = '';
    if(props.data.priceNegotiable) {
        price = 'Preço negociável'
    } else {
        price = `R$ ${props.data.price}`
    }

    return (
        <Item className='aditem'>
            <Link to={`/ad/${props.data.id}`}>
                <div className="itemImage">
                    <img src={props.data.image} alt="" />
                </div>
                <div className="itemName">
                    {props.data.title}
                </div>
                <div className="itemPrice">
                    {price}
                </div>
            </Link>
        </Item>
    )
    
}

export default AdItem;