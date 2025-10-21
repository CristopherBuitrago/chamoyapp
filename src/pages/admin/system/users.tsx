import { useMemo, useRef, useState } from "react";
import {
  Card,
  ConfigProvider,
  Input,
  Select,
  Table,
  Tag,
  Space,
  Button,
  Tooltip,
  Modal,
  Descriptions,
  type TableProps,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { User } from "../../../entities/user/model/types";
import type { Role } from "../../../entities/auth/model/roles";
import { DATA, ROLE_COLORS } from "../../../entities/user/lib/mock";

export default function SystemUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewing, setViewing] = useState<User | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return DATA.filter((u) => {
      const name = (u.name ?? "").toLowerCase();
      const email = (u.email ?? "").toLowerCase();
      const phone = (u.phone ?? "").toLowerCase();
      const byText =
        !s ||
        name.includes(s) ||
        email.includes(s) ||
        phone.includes(s) ||
        String(u.id).includes(s);
      const byRole = roleFilter === "all" || u.role === roleFilter;
      return byText && byRole;
    });
  }, [search, roleFilter]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const columns: TableProps<User>["columns"] = [
    { title: "ID", dataIndex: "id", width: 90, sorter: (a, b) => a.id - b.id },
    { title: "Nombres", dataIndex: "name", ellipsis: true },
    { title: "Email", dataIndex: "email", ellipsis: true },
    {
      title: "Rol",
      dataIndex: "role",
      width: 220,
      render: (role: Role) => (
        <Tag color={ROLE_COLORS[role]} style={{ borderRadius: 999, padding: "2px 10px" }}>
          {role}
        </Tag>
      ),
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Acciones",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button type="text" icon={<EditOutlined />} onClick={() => setViewing(record)} />
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
          // tokens globales
          colorBorder: "rgba(0,0,0,0.08)",
          borderRadius: 14,
          fontSize: 14,
        },
        components: {
          Table: {
            headerBorderRadius: 12,
            headerBg: "#fafafa",
            rowHoverBg: "#f5f9ff",
            headerColor: "#1f2a44",
            cellPaddingBlock: 14, // padding vertical
          },
          Card: {
            boxShadowTertiary: "0 12px 28px rgba(39,48,85,0.10)",
          },
          Input: {
            controlHeightLG: 40,
          },
          Select: {
            controlHeightLG: 40,
          },
          Pagination: {
            itemActiveBg: "#e8f1ff",
          },
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
              placeholder="Buscar por nombre, email, teléfono…"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="users-filter">
            <div className="users-label">Filtros</div>
            <Select
              size="large"
              style={{ width: "100%" }}
              value={roleFilter}
              onChange={(v) => {
                setPage(1);
                setRoleFilter(v as any);
              }}
              options={[
                { label: "Todos los roles", value: "all" },
                { label: "Abogado", value: "admin" },
                { label: "Administrador", value: "superadmin" },
              ]}
              suffixIcon={<DownOutlined />}
            />
          </div>
        </header>

        {/* main */}
        <section className="users-table-wrap">
          <Card className="users-card">
            <Table<User>
              className="users-table"
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

      {/* modal */}
      <Modal
        open={!!viewing}
        centered
        getContainer={() => contentRef.current!}
        closable={false}
        maskClosable={false}
        width={680}
        title={null}
        footer={[
          <Button key="cancel" onClick={() => setViewing(null) }>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={() => setViewing(null)}>
            OK
          </Button>,
        ]}
        styles={{
          body: { paddingTop: 12, paddingBottom: 4 },
          mask: { backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(1.5px)" },
        }}
      >
        {viewing && (
          <div style={{ display: "grid", gap: 12 }}>
            {/* Header visual del modal */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <div
                style={{
                  width: 44, height: 44, borderRadius: 9999,
                  background: "#EEF2FF", color: "#273055",
                  display: "grid", placeItems: "center", fontWeight: 700,
                }}
              >
                {viewing.name?.split(" ").slice(0, 2).map(s => s[0]).join("").toUpperCase()}
              </div>
              <div style={{ lineHeight: 1.15 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{viewing.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{viewing.email}</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Tag color={ROLE_COLORS[viewing.role]} style={{ borderRadius: 999, padding: "2px 10px" }}>
                  {viewing.role}
                </Tag>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }} />

            {/* Cuerpo con Descriptions */}
            <Descriptions
              column={1}
              size="middle"
              colon
              labelStyle={{ width: 160, fontWeight: 600 }}
              contentStyle={{ maxWidth: 280 }}
            >
              <Descriptions.Item label="ID">{viewing.id}</Descriptions.Item>
              <Descriptions.Item label="Teléfono">{viewing.phone || "—"}</Descriptions.Item>
              <Descriptions.Item label="Nombre completo" span={2}>{viewing.name}</Descriptions.Item>
              <Descriptions.Item label="Email" span={2}>{viewing.email}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
}
