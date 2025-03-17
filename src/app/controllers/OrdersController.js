import Order from '../models/Order';

class OrdersController {
  // Criar um novo pedido
  async store(req, res) {
    try {
      const newOrder = await Order.create(req.body);

      // Log bonito no terminal
      console.log(`\x1b[32m[✔] Pedido Criado com Sucesso!\x1b[0m`);
      console.log(`\x1b[34m📌 ID Pedido:\x1b[0m ${newOrder._id}`);
      console.log(`\x1b[34m👤 Cliente:\x1b[0m ${newOrder.customer?.name || "N/A"} (${newOrder.customer?.doc || "N/A"})`);
      console.log(`\x1b[34m🏪 Loja:\x1b[0m ${newOrder.seller?.name || "N/A"}`);
      console.log(`\x1b[34m💳 Método de Pagamento:\x1b[0m ${newOrder.payment?.method || "N/A"}`);
      console.log(`\x1b[34m💰 Valor Total:\x1b[0m R$ ${newOrder.payment?.amount?.toFixed(2) || "0.00"}`);
      console.log(`\x1b[34m📅 Data:\x1b[0m ${new Date().toLocaleString()}`);
      console.log(`\x1b[36m-----------------------------------\x1b[0m`);

      return res.status(201).json(newOrder);
    } catch (error) {
      console.error(`\x1b[31m[✖] Erro ao criar pedido:\x1b[0m`, error.message);
      return res.status(500).json({ error: "Erro ao criar pedido", details: error.message });
    }
  }

  // Listar todos os pedidos
  async index(req, res) {
    try {
      const orders = await Order.find();
      return res.json(orders);
    } catch (error) {
      console.error(`\x1b[31m[✖] Erro ao buscar pedidos:\x1b[0m`, error.message);
      return res.status(500).json({ error: "Erro ao buscar pedidos", details: error.message });
    }
  }
}

export default new OrdersController();
