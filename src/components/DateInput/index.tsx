'use client'

import { useState } from "react";

export function DateInput() {
    const [value, setValue] = useState('');

    const handleInput = (e:any) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (input.length > 8) {
          input = input.slice(0, 8); // Limita o comprimento a 8 caracteres
        }
    
        const formattedDate = formatDate(input);
        setValue(formattedDate);
      };
    
      const formatDate = (input:any) => {
        const parts = input.match(/(\d{1,2})(\d{1,2})?(\d{1,4})?/);
        if (!parts) return input; // Se não houver correspondência, retorna o input original
    
        let result = '';
        if (parts[1]) result = parts[1];
        if (parts[2]) result += '/' + parts[2];
        if (parts[3]) result += '/' + parts[3];
        return result;
      };

    return (
        <>
            <input 
                className="border p-3 bg-transparent border-[#595858] h-[50px] w-full outline-none" 
                name="date" 
                type="text" 
                placeholder="Data do recebimento"
                value={value}
                onInput={handleInput}
                required 
            />
        </>
    )
}