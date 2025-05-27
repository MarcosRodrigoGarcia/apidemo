import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Sidebar = ({ onSelect }) => (
  <div className="w-64 h-screen bg-[#0b0b0b] text-white p-4 space-y-4 shadow-xl">
    <div className="mb-6">
      <img src="/logo-aelis.png" alt="Aelis Logo" className="w-32" />
    </div>
    <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#1f1f1f]" onClick={() => onSelect("clientes")}>Clientes</Button>
    <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#1f1f1f]" onClick={() => onSelect("articulos")}>Artículos</Button>
    <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#1f1f1f]" onClick={() => onSelect("facturas")}>Facturas</Button>
  </div>
);

const ClientesForm = () => {
  const [formData, setFormData] = useState({
    codigoCuenta: "",
    cifDni: "",
    razonSocial: "",
    codigoTransaccion: "",
    codigoEmpresa: "",
    clienteOProveedor: "C",
    codigoCategoriaCliente_: "CLI"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/clientes/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Error en la creación del cliente");
      const data = await response.json();
      alert("Cliente creado con éxito: " + JSON.stringify(data));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Card className="max-w-xl w-full bg-[#f0f0f0] border border-[#cccccc]">
      <CardContent className="p-6 space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="grid gap-2">
            <Label htmlFor={key} className="text-gray-700 font-medium">{key}</Label>
            <Input id={key} name={key} value={formData[key]} onChange={handleChange} className="border border-gray-300" />
          </div>
        ))}
        <Button className="bg-[#00ffaa] text-black hover:bg-[#00cc88]" onClick={handleSubmit}>Crear Cliente</Button>
      </CardContent>
    </Card>
  );
};

const ArticulosForm = () => (
  <Card className="max-w-xl w-full bg-[#f0f0f0] border border-[#cccccc]">
    <CardContent className="p-6 space-y-4 text-gray-700">
      <p className="text-xl font-semibold">Formulario de Artículos</p>
      <p>Próximamente...</p>
    </CardContent>
  </Card>
);

const FacturasForm = () => (
  <Card className="max-w-xl w-full bg-[#f0f0f0] border border-[#cccccc]">
    <CardContent className="p-6 space-y-4 text-gray-700">
      <p className="text-xl font-semibold">Formulario de Facturas</p>
      <p>Próximamente...</p>
    </CardContent>
  </Card>
);

export default function DemoWebSage() {
  const [view, setView] = useState("clientes");

  return (
    <div className="flex">
      <Sidebar onSelect={setView} />
      <main className="flex-1 p-8 bg-[#ffffff] min-h-screen">
        {view === "clientes" && <ClientesForm />}
        {view === "articulos" && <ArticulosForm />}
        {view === "facturas" && <FacturasForm />}
      </main>
    </div>
  );
}
