using backend.Repositories.Order;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace backend.Services.Order;

public class OrderService(IOrderRepository orderRepository)
{
    public byte[]? CreateOrderPdf(OrderData orderData)
    {
        var document = new InvoiceDocument(orderData);
        var pdf = document.GeneratePdf();
        return pdf;
    }
}