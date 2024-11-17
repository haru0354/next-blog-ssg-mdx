type BesideHeaderTableProps = {
  titles: string[];
  contents: string[][];
};

const BesideHeaderTable: React.FC<BesideHeaderTableProps> = ({
  titles = [],
  contents = [],
}) => {
  return (
    <table>
      <thead>
        <tr>
          {titles.map((title, index) => (
            <th key={index} className="text-white font-semibold bg-layout-mainColor opacity-70">{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contents.map((content, index) => (
          <tr key={index}>
            {content.map((item, index) => (
              <td key={index}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BesideHeaderTable;
