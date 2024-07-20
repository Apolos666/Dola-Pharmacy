using backend.Data;
using backend.Repositories.Generic;

namespace backend.Repositories.ShippingMethod;

public class ShippingMethodRepository(DbFactory dbFactory)
    : Repository<Models.ShippingMethod>(dbFactory), IShippingMethodRepository;