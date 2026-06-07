import { useForms } from "../../store/store";
interface CountryInputProps {   error?: string;

}

const CountryInput = ({ 
  error,
  ...props
}: CountryInputProps)=> {
  const countries = useForms((state) => state.countries);

  return (
    <div >
      <label htmlFor="country" className="mr-5">Country</label>
      <input
        id="country"
        name="country"
        list="countries"  
        className="bg-cyan-50" 
        {...props}        
      />

      <datalist id="countries">
        {countries.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
       <div className="text-red-500 my-2">{error ?? '\u00A0'}</div>
    </div>
  );
}
export default CountryInput;