import { PageArea, SearchArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAPI from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';

const Page = ()=>{
    const api = useAPI();
    
    type StateType = {_id: string, name: string};
    const [stateList, setStateList] = useState<StateType[]>([]);
    type CategoryType = {name: string, img:string, slug:string};
    const [categories, setCategories]=useState<CategoryType[]>([]);
    const [adList, setAdList] = useState([]);

    useEffect(()=>{
        const getStates = async()=>{
            const slist = await api.getStates();
            setStateList(slist)
        }
        getStates();
    }, [])
    
    useEffect(()=>{
        const getCategories = async()=>{
            const cats = await api.getCategories();
            setCategories(cats)
        }
        getCategories();
    }, [])
    
    useEffect(()=>{
        const getRecentAds = async()=>{
            const json = await api.getAds({
                sort: 'desc',
                limit: 8
            });
            setAdList(json.ads)
        }
        getRecentAds();
    }, [])

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form action="/ads" method='GET'>
                            <input type="text" name="q" id="text" placeholder='O que você procura?'/>
                            <select name="state" id="state">
                                {stateList.map((item, index)=>(
                                    <option value={item.name} key={index}>{item.name}</option>
                                ))}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((item, index)=>(
                            <Link key={index} to={`/ads?${item.slug}`} className='categoryItem'>
                                <img src={item.img} alt="" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((item, index)=>(
                            <AdItem key={index} data={item}/>
                        ))}
                    </div>
                    <Link to={'/ads'} className='seeAllLink'>Ver todos</Link>
                    <hr />

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper
                     dapibus arcu. Aliquam iaculis, velit a suscipit viverra, metus ipsum eleifend
                      turpis, in interdum odio orci quis justo. Pellentesque massa mi, rhoncus ut
                       hendrerit porta, accumsan non enim.

                </PageArea>
            </PageContainer>
        </>
    );

};

export default Page;