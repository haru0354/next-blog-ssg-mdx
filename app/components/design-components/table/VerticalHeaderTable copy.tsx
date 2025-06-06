type VerticalHeaderTableProps = {
  verticalItems: VerticalItems[];
};

type VerticalItems = {
  title: string;
  items: string[];
};

const VerticalHeaderTable: React.FC<VerticalHeaderTableProps> = ({
  verticalItems,
}) => {
  return (
    <table>
      <tbody>
        {verticalItems.map((verticalItem) => (
          <tr key={verticalItem.title}>
            <th className="text-white font-semibold bg-layout-mainColor opacity-70">{verticalItem.title}</th>
            {verticalItem.items.map((item, index) => (
              <td key={index}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VerticalHeaderTable;
