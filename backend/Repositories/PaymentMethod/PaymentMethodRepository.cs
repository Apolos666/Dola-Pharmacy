using backend.Data;
using backend.Repositories.Generic;

namespace backend.Repositories.PaymentMethod;

public class PaymentMethodRepository(DbFactory dbFactory)
    : Repository<Models.PaymentMethod>(dbFactory), IPaymentMethodRepository;