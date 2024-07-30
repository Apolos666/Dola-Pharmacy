using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class InvoiceDocument(OrderData model) : IDocument
{
    public OrderData Model { get; } = model;

    public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

    private decimal CalculateTotalPrice() => Model.LineItems.Sum(item => item.ProductPrice * item.ProductQuantity);

    public void Compose(IDocumentContainer container)
    {
        container
            .Page(page =>
            {
                page.Size(PageSizes.A4);
                page.MarginHorizontal(1, Unit.Centimetre);
                page.MarginVertical(1, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(20));

                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeContent);

                page.Footer().Element(ComposeFooter);
            });
    }

    private void ComposeHeader(IContainer container)
    {
        container.Column(column =>
            {
                column
                    .Item()
                    .Row(row =>
                    {
                        row
                            .RelativeItem()
                           .Text(DateTime.Now.ToString("dd/MM/yyyy, hh:mm tt"))
                           .FontSize(10)
                           .Bold();

                        row
                            .RelativeItem()
                            .Text("Dola Pharmacy - Cảm ơn")
                            .FontSize(10)
                            .Bold()
                            .AlignRight();
                    });

                column.Spacing(1, Unit.Centimetre);

                column
                    .Item()
                    .AlignCenter()
                    .Width(4, Unit.Centimetre)
                    .Image("C:\\Projects\\Dola-Pharmacy\\backend\\StaticFile\\Images\\logo.webp")
                    .FitWidth();

                column.Spacing(1, Unit.Centimetre);

                column.Item()
                    .Text("Cảm ơn bạn đã đặt hàng")
                    .FontSize(14)
                    .AlignCenter()
                    .Bold();
            });
    }

    private void ComposeContent(IContainer container)
    {
        container.PaddingVertical(1, Unit.Centimetre)
            .Column(x =>
            {
                x.Item()
                    .Border(1)
                    .BorderColor(Colors.Grey.Lighten1)
                    .Padding(0.5f, Unit.Centimetre)
                    .Text("Đơn hàng của bạn")
                    .FontSize(14)
                    .Bold();

                x.Item()
                    .Border(1)
                    .BorderColor(Colors.Grey.Lighten1)
                    .Padding(0.5f, Unit.Centimetre)
                    .Column(column =>
                    {
                        foreach (var item in Model.LineItems)
                        {
                            column.Spacing(1, Unit.Centimetre);
                            column.Item().Row(row =>
                            {
                                row.RelativeItem(4)
                                    .Text(item.ProductDescription)
                                    .FontSize(12);
                                row.RelativeItem(1)
                                    .Text(item.ProductQuantity.ToString())
                                    .FontColor("#5dac46")
                                    .Bold()
                                    .FontSize(12)
                                    .AlignRight();
                                row.RelativeItem(1)
                                    .Text(item.ProductPrice.ToString("#,##0") + "đ")
                                    .FontColor("#5dac46")
                                    .Bold()
                                    .FontSize(12)
                                    .AlignRight();
                            });
                        }
                    });

                x.Item()
                    .Border(1)
                    .BorderColor(Colors.Grey.Lighten1)
                    .Padding(0.5f, Unit.Centimetre)
                    .Column(column =>
                    {
                        column.Spacing(0.4f, Unit.Centimetre);

                        column.Item().Row(row =>
                        {
                            row.RelativeItem()
                                .Text("Tạm tính")
                                .FontSize(12);
                            row.RelativeItem()
                                .Text(CalculateTotalPrice().ToString("#,##0") + "đ")
                                .FontSize(12)
                                .Bold()
                                .AlignRight()
                                .FontColor("#1b74e7");
                        });

                        column.Item().Row(row =>
                        {
                            row.RelativeItem()
                                .Text("Phí vận chuyển")
                                .FontSize(12);
                            row.RelativeItem()
                                .Text(Model.ShippingFee.ToString("#,##0") + "đ")
                                .FontSize(12)
                                .Bold()
                                .AlignRight()
                                .FontColor("#1b74e7");
                        });
                    });

                x.Item()
                    .Border(1)
                    .BorderColor(Colors.Grey.Lighten1)
                    .Padding(0.5f, Unit.Centimetre)
                    .Row(row =>
                    {
                        row.RelativeItem(1)
                            .Text("Tổng số tiền")
                            .FontSize(14)
                            .Bold();
                        row.RelativeItem(1)
                            .Text((CalculateTotalPrice() + Model.ShippingFee).ToString("#,##0") + "đ")
                            .FontSize(12)
                            .Bold()
                            .AlignRight()
                            .FontColor(Colors.Green.Accent3);
                    });


                x.Item()
                    .PaddingTop(1, Unit.Centimetre)
                    .Border(1)
                    .BorderColor(Colors.Grey.Lighten1)
                    .Padding(0.5f, Unit.Centimetre)
                    .Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        table.Cell().Row(1).Column(1).Column(column =>
                        {
                            column.Spacing(0.35f, Unit.Centimetre);

                            column.Item()
                                .Text("Thông tin mua hàng")
                                .FontSize(14)
                                .Bold();

                            column.Item()
                                .Text(Model.FullName)
                                .FontSize(12);

                            column.Item()
                                .Text(Model.Email)
                                .FontSize(12);

                            column.Item()
                                .Text(Model.PhoneNumber)
                                .FontSize(12);
                        });

                        table.Cell().Row(1).Column(2).Column(column =>
                        {
                            column.Spacing(0.35f, Unit.Centimetre);

                            column.Item()
                                .Text("Địa chỉ nhận hàng")
                                .FontSize(14)
                                .Bold();

                            column.Item()
                                .Text(Model.FullName)
                                .FontSize(12);

                            column.Item()
                                .Text(Model.Address)
                                .FontSize(12);

                            column.Item()
                                .Text($"{Model.Province}, {Model.District}, {Model.Ward}")
                                .FontSize(12);

                            column.Item()
                                .Text("Model.PhoneNumber")
                                .FontSize(12);

                            column.Item()
                            .Text("")
                            .FontSize(12);
                        });

                        table.Cell().Row(2).Column(1).Column(column =>
                        {
                            column.Spacing(0.35f, Unit.Centimetre);

                            column.Item()
                                .Text("Thời gian giao hàng")
                                .FontSize(14)
                                .Bold();

                            column.Item()
                                .Text($"Ngày giao: {Model.OrderDate:dd/MM/yyyy}")
                                .FontSize(12);

                            column.Item()
                                .Text($"Thời gian giao: {Model.DeliveryTime}")
                                .FontSize(12);
                        });
                    });
            });
    }

    private void ComposeFooter(IContainer container)
    {
        container.AlignCenter()
            .Row(row =>
            {
                row.RelativeItem()
                    .Text(Model.CurrentSuccessUrl)
                    .FontSize(12)
                    .Bold();

                row.RelativeItem()
                    .Text(x =>
                    {
                        x.AlignRight();
                        x.DefaultTextStyle(y => y.FontSize(12).Bold());
                        x.Span("Page ");
                        x.CurrentPageNumber();
                        x.Span("/");
                        x.TotalPages();
                    });
            });
    }
}