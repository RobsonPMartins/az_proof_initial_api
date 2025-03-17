import jwt from 'jsonwebtoken';

class SessionsController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      
      console.log("Tentativa de login:", { email, password });

      // Validação do email
      if (email !== "teste@azape.co" || password !== "123456") {
        console.log("Login falhou: credenciais inválidas");
        return res.status(401).json({
          error: true,
          message: "Usuário não encontrado. Verifique se o e-mail digitado está correto e tente novamente."
        });
      }

      // Criar token JWT
      const userId = "12345";
      const token = jwt.sign({ id: userId }, "secreta", { expiresIn: "1h" });

      console.log("Login bem-sucedido! Token gerado:", token);
      return res.json({ token });

    } catch (error) {
      console.error("Erro interno no servidor:", error);
      return res.status(500).json({ error: true, message: "Erro interno no servidor." });
    }
  }
}

export default new SessionsController();
