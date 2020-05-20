import { EuiBasicTable, EuiCheckbox } from "@elastic/eui";
export default function () {
  const columns = [
    { field: "name", name: "Name", sortable: true },
    {
      field: "enabled",
      name: "Enabled",
      dataType: "boolean",
      render: (enabled) => <EuiCheckbox checked={enabled} />,
    },
  ];
  const filterRules = [
    { name: "test1", enabled: true },
    { name: "test2", enabled: false },
  ];
  return (
    <>
      <p>Dashboard</p>;
      <EuiBasicTable items={filterRules} columns={columns} responsive={false} />
    </>
  );
}
