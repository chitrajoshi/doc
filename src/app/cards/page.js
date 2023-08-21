"use client"; // This is a client component

import {useState, useEffect} from 'react';

export default function Cards() {

    const [doc,setDoc] = useState([]);
    const [noOfCard, setNoOfCard] = useState('');
    const [drawnCard, setdrawnCard] = useState([]);

    const suites = ['club', 'spade', 'heart', 'diamond'];
    const values = [
        "Ace",
        "King",
        "Queen",
        "Jack",
        "10",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
      ];

      const createDeckOfCards = () => {
        let count = 1;
        let arr = [];
        suites.forEach((item) => {
            values.forEach((value) => {
                arr.push({suit :item, value: value, priority:count++});
            })
        });
        setDoc(arr);
        console.log(arr.length);
      }

      useEffect(() => {
        createDeckOfCards();
      },[]);

      const shuffleCards = () => {
        let arr = [...doc];
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        setDoc(arr);
      }

      const drawCards = () => {
        if(noOfCard != 0){
            if(doc.length>0){
                let arr = [...doc];
                let selected = [];
                for(let i=0; i<noOfCard; i++){
                    let j = Math.floor(Math.random() * arr.length);
                    selected.push(arr[j]);
                    arr = [...arr.slice(0, j), ...arr.slice(j+1, arr.length)];
                }
                selected.sort(function(a, b){
                    if(a.priority < b.priority){
                        return -1;
                    }else{
                        return 1;
                    }
                    return 0;
                });
                setdrawnCard(drawnCard => [...drawnCard, ...selected]);
                setDoc(arr);
            }else{
                alert("doc not sufficient");
            } 
        }else{
            alert("Please enter no. of cards");
        }
      }

      const onChangeHandler = (event) => {
        setNoOfCard(event.target.value);
      }

    return(
        <div className='flex flex-col justify-center'>
            <ul className='flex flex-row flex-wrap'>
                {doc.map((item, index) => {
                    return(
                        <li key={index} className='border-2 border-solid border-white m-1 p-4 text-center' style={{width: '100px', flex: "7%"}}>
                                <h3>{item.suit}</h3>
                                <h6>{item.value}</h6>
                        </li>  
                    );
                })}
            </ul>
            <button onClick={shuffleCards} className='bg-white text-black m-2 p-4 w-1/3'>Shuffle</button>
            <label>Please enter no of cards</label>
            <input 
                type='text'
                maxLength={2}
                value={noOfCard}
                onChange={onChangeHandler} 
                className='w-1/3 text-black m-2 p-4'
                />
            <button onClick={drawCards} className='bg-white text-black m-2 p-4 w-1/3'>Draw Cards</button>
            {drawnCard.length > 0 &&  <ul className='flex flex-row flex-wrap'>
                {drawnCard.map((item, index) => {
                    return(
                        <li key={index} className='border-2 border-solid border-white m-1 p-4 text-center' style={{width: '100px', flex: "7%"}}>
                                <h3>{item.suit}</h3>
                                <h6>{item.value}</h6>
                            </li>  
                    );
                })}
            </ul>}
           
        </div>
    );
}