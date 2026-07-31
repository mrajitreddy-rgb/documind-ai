def parse_amount(value):

    if value is None:
        return 0.0

    try:
        if isinstance(value, str):
            value = (
                value.replace(",", "")
                     .replace("₹", "")
                     .strip()
            )

        return float(value)

    except Exception:
        return 0.0