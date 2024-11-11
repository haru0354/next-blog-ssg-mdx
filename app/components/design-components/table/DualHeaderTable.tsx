type DualHeaderTableProps = {
  besideTitles: string[];
  verticalItems: VerticalItems[];
};

type VerticalItems = {
  title: string;
  items: string[];
};

const DualHeaderTable: React.FC<DualHeaderTableProps> = ({
    besideTitles = [],
    verticalItems = [],
}) => {
  return (
    <table>
      <thead>
        <tr>
          {besideTitles.map((besideTitle, index) => (
            <th key={index}>{besideTitle}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {verticalItems.map((verticalItem, index) => (
          <tr key={index}>
            <th>{verticalItem.title}</th>
            {verticalItem.items.map((item, index) => (
              <td key={index}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DualHeaderTable;
