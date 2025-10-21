import { useMemo, useState } from "react";
import {
  Button,
  Card,
  ConfigProvider,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  type TableProps,
} from "antd";
import { DeleteOutlined, DownOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import type { Client, CustomerType } from "../../../entities/client/model/types";
import { CUSTOMER_TYPE_COLOR, DATA } from "../../../entities/client/lib/mock";

export default function AdminClients() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | CustomerType>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return DATA.filter((c) => {
      const byText =
        !s ||
        c.name.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.phone.toLowerCase().includes(s) ||
        String(c.id).includes(s);
      const byType = typeFilter === "all" || c.customerType === typeFilter;
      return byText && byType;
    });
  }, [search, typeFilter]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const columns: TableProps<Client>["columns"] = [
    { title: "ID", dataIndex: "id", width: 90, sorter: (a, b) => a.id - b.id },
    { title: "Nombres", dataIndex: "name", ellipsis: true },
    { title: "Phone", dataIndex: "phone", ellipsis: true },
    { title: "Email", dataIndex: "email", ellipsis: true },
    {
      title: "Tipo cliente",
      dataIndex: "customerType",
      width: 160,
      render: (t: CustomerType) => (
        <Tag color={CUSTOMER_TYPE_COLOR[t]} style={{ borderRadius: 999, padding: "0 10px" }}>
          {t}
        </Tag>
      ),
    },
    {
      title: "Pedidos",
      dataIndex: "ordersAmount",
      width: 160,
      render: (orders: number) => (
        <Tag color="default" style={{ borderRadius: 999, padding: "0 10px" }}>
          {orders}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      width: 160,
      render: (_, record) => (
        <Space>
          <Tooltip title="Visualizar">
            <Button type="text" icon={<EyeOutlined />} onClick={() => console.log("visualizar", record)} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button danger type="text" icon={<DeleteOutlined />} onClick={() => console.log("eliminar", record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 14,
          colorBorder: "rgba(0,0,0,0.08)",
          fontSize: 14,
        },
        components: {
          Table: {
            headerBorderRadius: 12,
            headerBg: "#fafafa",
            rowHoverBg: "#f5f9ff",
            headerColor: "#1f2a44",
            cellPaddingBlock: 14,
          },
          Card: {
            boxShadowTertiary: "0 12px 28px rgba(39,48,85,0.10)",
          },
          Input: { controlHeightLG: 40 },
          Select: { controlHeightLG: 40 },
          Pagination: { itemActiveBg: "#e8f1ff" },
        },
      }}
    >
      <main className="users-layout mt-10">
        {/* header */}
        <header className="users-header">
          <div className="users-search">
            <div className="users-label">Buscar</div>
            <Input
              allowClear
              size="large"
              prefix={<SearchOutlined />}
              placeholder="Buscar por nombre, email…"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="users-filter">
            <div className="users-label">Filtros</div>
            <Space.Compact style={{ width: "100%" }}>
              <Select
                size="large"
                style={{ width: "100%" }}
                value={typeFilter}
                onChange={(v) => {
                  setPage(1);
                  setTypeFilter(v as any);
                }}
                options={[
                  { label: "Tipos", value: "all" },
                  { label: "VIP", value: "VIP" },
                  { label: "Corriente", value: "CORRIENTE" },
                ]}
                suffixIcon={<DownOutlined />}
              />
            </Space.Compact>
          </div>
        </header>

        {/* tabla */}
        <section className="users-table-wrap">
          <Card className="users-card">
            <Table<Client>
              rowKey="id"
              columns={columns}
              dataSource={paged}
              size="middle"
              pagination={{
                current: page,
                pageSize,
                total: filtered.length,
                showSizeChanger: true,
                pageSizeOptions: [5, 10],
                onChange: (p, ps) => {
                  setPage(p);
                  setPageSize(ps);
                },
                showTotal: (total, [start, end]) =>
                  `Página ${page} de ${Math.max(1, Math.ceil(total / pageSize))} — mostrando ${start}-${end} de ${total}`,
                locale: { items_per_page: "/página" },
                align: "center",
              }}
              rowClassName={(_, idx) =>
                idx % 2 === 0 ? "users-row users-row--zebra" : "users-row"
              }
            />
          </Card>
        </section>
      </main>
    </ConfigProvider>
  );
}
