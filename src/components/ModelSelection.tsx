'use client';

import useSWR from 'swr';
import Select from 'react-select';

const fetchModels = () => {
    return fetch('/api/getEngines').then(res => res.json())
}



function ModelSelection() {

const { data: models, isLoading } = useSWR('models', fetchModels);
const { data: model, mutate: setModel } = useSWR('model', 
    {
        fallbackData: 'text-davinci-003'
    });
const customStyles = {
    option: (provided: any, state: { isSelected: any, isFocused: any }) => ({
        color: state.isSelected ? 'black' : 'black',
        padding: 10,
        backgroundColor: state.isFocused ? 'lightblue' : 'white',
        ':active': {
            backgroundColor: 'darkblue',
            color: 'white',
          },
    })
    }

  return (
    <div>
        <Select 
            className='mt-2'
            isSearchable
            isLoading={isLoading}
            menuPosition = 'fixed'
            classNames={{
                control: (state) => "bg-[#434654] border-[#434654] text-black"
            }}
            placeholder={model}
            defaultValue={model}
            options = {models?.modelOptions}
            onChange= {(e) => setModel(e.value)}
            styles={customStyles}
        />
    </div>
  )
}

export default ModelSelection