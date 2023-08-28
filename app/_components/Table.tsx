import { Drink } from "../page";

import Timestamp from "./Timestamp";

const Table = ({ drinks }: { drinks: Drink[] }) => {
  return (
    <table className="w-full border-t border-stone-500">
      <tbody>
        {drinks.map((drink) => (
          <tr key={drink.id} className="flex justify-between">
            <td className="py-2 font-bold">{drink.units} Units</td>
            <td className="py-2 text-stone-400">{drink.volume}ml</td>
            <td className="py-2 text-stone-400">{drink.abv}%</td>
            <td className="py-2 text-stone-400">
              <Timestamp date={drink.created_at} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
