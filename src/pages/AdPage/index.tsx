import { PageArea, Fake, OthersArea, BreadChumb } from './styled';
import { PageContainer } from '../../components/MainComponents';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import useAPI from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';

const Page = ()=>{
    const api = useAPI();
    
    const {id} = useParams();

    const [loading, setLoading] = useState(true);

    const [adInfo, setAdInfo]=useState({
        title: '',
        description: '',
        id: '',
        dateCreated: '',
        price: 0,
        priceNegotiable: false,
        stateName: '',
        views: 0,
        images: [''],
        userInfo: {
            name: '',
            email: ''
        },
        others: [{
            id: '',
            title: '',
            price: 0,
            priceNegotiable: false,
            image: ''
        }],
        category: {
            _id: '',
            name: "",
            slug: ""
        }
    });

    useEffect(()=>{
        const getAdInfo = async(id:string | undefined)=>{
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id)
    }, [api, id])

    const formatDate = (date:string)=>{
        const cDate = new Date(date);

        const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        const cDay = cDate.getDate();
        const cMonth = cDate.getMonth();
        const cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`
    }

    return (
        <PageContainer>
            {adInfo.category &&
                <BreadChumb>
                    Você está aqui:
                    <Link to={'/'}>Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    / {adInfo.title}
                </BreadChumb>
            }            
            

            <PageArea>
               <div className="leftSide">
                    <div className="box">

                        <div className="adImage">
                            {loading && <Fake height={300}/>}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((item, index)=>(
                                        <div key={index} className="each-slide">
                                            <img src={item} alt=""/>
                                        </div>
                                    ))}
                                </Slide>
                            } 
                            
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20}/>}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100}/>}
                                {adInfo.description}
                                <hr />
                                {adInfo.views &&
                                    <small>Visualizações : {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
               </div>

               <div className="rightSide">
                    <div className="box box-padding">
                        {loading && <Fake height={20}/>}
                        {adInfo.priceNegotiable &&
                            "Preço negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">Preço: <span>R$ {adInfo.price}</span></div>
                        }

                    </div>
                    {loading && <Fake height={50}/>}
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} className='contactSellerLink' target='_blank'>Fale com o vendedor</a>
                            <div className="box box-padding createdBy">
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>Email: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    }
                    
               </div>  
            </PageArea>
            <OthersArea>

            
            {adInfo.others &&
                    <>
                        <h2>Outras ofertas do vendedor:</h2>
                        <div className="list">
                            {adInfo.others.map((item, index)=>(
                                <AdItem key={index} data={item}/>
                            ))}
                        </div>
                    </>
               }
            </OthersArea>
        </PageContainer>
    );
    

};

export default Page;