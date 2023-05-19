import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { useState, useRef, useEffect } from 'react';
import useAPI from '../../helpers/OlxAPI';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const AddAd = ()=>{
    const api = useAPI();

    const fileField = useRef<HTMLInputElement>(null);
    console.log('fileFiled: ', fileField)

    const [title, setTitle]=useState('');
    const [category, setCategory]=useState('');
    const [price, setPrice]=useState('');
    const [priceNegotiable, setPriceNegotiable]=useState(false);
    const [desc, setDesc]=useState('');
    type CategoryType = {name: string, img:string, slug:string, _id:string};
    const [categories, setCategories] =useState<CategoryType[]>([]);

    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        const getCategories = async()=>{
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    },[])
    

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setDisabled(true);
        setError('');
        const errors = [];
        const files= fileField.current?.files;
        console.log('files: ', files)

        if(!title.trim()) {
            errors.push('Sem título');
        }
        if(!category) {
            errors.push('Sem categoria');
        }

        if(errors.length === 0) {

            const fData = new FormData();

            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable.toString());
            fData.append('desc', desc);
            fData.append('cat', category);

            if(files != null) {
                if(files.length > 0) {
                    for(let i =0; i <files.length; i++) {
                        console.log('Files[i]: ',files[i]);
                        fData.append('img', files[i])
                    }
                } 
            }
            console.log(fData)

            /* const json = await api.addAd(fData); 

            if(!json.eror) {
                history(`/ad/${json.id}`);
                return;
            } else {
                setError(json.error);
            }  */


        } else {
            setError(errors.join("\n"))
        }

        setDisabled(false);
        
    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form  onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input type="text" 
                                id="text" 
                                disabled={disabled}
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select id="select" 
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}
                                required
                            >   
                                <option></option>
                                {categories &&
                                    categories.map((item)=>(
                                        <option key={item._id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput
                                mask={priceMask}
                                placeholder='R$ '
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Preço negociável</div>
                        <div className="area--input">
                            <input type="checkbox" name="checkbox" id="checkbox" 
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={()=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                           <textarea name="textarea" id="textarea"
                                disabled={disabled}
                                value={desc}
                                onChange={e=>setDesc(e.target.value)}
                            >

                           </textarea>
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title">Imagens (1 ou mais)</div>
                        <div className="area--input">
                           <input type="file" name="file" id="file"
                                disabled={disabled} 
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Adicionar anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
    

};

export default AddAd;