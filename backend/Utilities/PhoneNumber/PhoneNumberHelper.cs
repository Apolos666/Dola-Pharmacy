using PhoneNumbers;

namespace backend.Utilities.PhoneNumber;

public static class PhoneNumberHelper
{
    private static readonly PhoneNumberUtil PhoneNumberUtil = PhoneNumberUtil.GetInstance();

    public static bool IsValidPhoneNumber(string phoneNumber, string countryCode)
    {
        try
        {
            var numberProto = PhoneNumberUtil.Parse(phoneNumber, countryCode);
            return PhoneNumberUtil.IsValidNumber(numberProto);
        }
        catch (NumberParseException)
        {
            return false;
        }
    }

    public static string FormatE164(string phoneNumber, string countryCode)
    {
        try
        {
            var numberProto = PhoneNumberUtil.Parse(phoneNumber, countryCode);
            return PhoneNumberUtil.Format(numberProto, PhoneNumberFormat.E164);
        }
        catch (NumberParseException)
        {
            throw new ArgumentException("Invalid phone number or country code.");
        }
    }
    
    public static string GetCountryCodeFromPhoneNumber(string phoneNumber)
    {
        try
        {
            var numberProto = PhoneNumberUtil.Parse(phoneNumber, null); // Attempt to parse without a default region
            var regionCode = PhoneNumberUtil.GetRegionCodeForNumber(numberProto);
            return regionCode;
        }
        catch (NumberParseException)
        {
            throw new ArgumentException("Could not determine the country code from the phone number.", nameof(phoneNumber));
        }
    }
}