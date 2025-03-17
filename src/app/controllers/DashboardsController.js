import Order from "../models/Order";

class DashboardsController {
  async index(req, res) {
    try {
      const { startDate, endDate } = req.query;

      // Filtro por período
      const filter = {};
      if (startDate && endDate) {
        filter["createdAt"] = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      // Buscar todos os pedidos
      const orders = await Order.find(filter);

      // Total de pedidos
      const totalPedidos = orders.length;
      const totalValorPedidos = orders.reduce((acc, order) => acc + order.payment.amount, 0);

      // Filtrar apenas vendas concluídas (exemplo: status "Aprovado", "Entregue")
      const vendasConcluidas = orders.filter(order => 
        ["Aprovado", "Entregue"].includes(order.payment.status)
      );

      const totalVendas = vendasConcluidas.length;
      const totalValorVendas = vendasConcluidas.reduce((acc, order) => acc + order.payment.amount, 0);

      // Ticket médio (evitar divisão por zero)
      const ticketMedio = totalVendas > 0 ? totalValorVendas / totalVendas : 0;

      // Preparar lista de pedidos
      const pedidos = orders.map(order => ({
        idPedido: order._id,
        idLoja: order.seller.id,
        dataCriacao: order.createdAt.toISOString().split("T")[0], // Formato YYYY-MM-DD
        nomeCliente: order.customer.name,
        cpfCliente: order.customer.doc,
        statusPedido: order.status,
        statusPagamento: order.payment.status,
        metodoPagamento: order.payment.method,
        total: order.payment.amount.toFixed(2),
      }));

      return res.json({
        cards: {
          totalPedidos,
          totalValorPedidos: totalValorPedidos.toFixed(2),
          totalVendas,
          totalValorVendas: totalValorVendas.toFixed(2),
          ticketMedio: ticketMedio.toFixed(2),
        },
        pedidos,
      });

    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar os dados do dashboard" });
    }
  }
}

export default new DashboardsController();
