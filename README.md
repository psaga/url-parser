# URL Parser
##### There are two inputs:
- URL format: is used to extract variables ( :...), and constants ( /...).
- URL instance: is used to extract url parameters (?... or &...), with theirs values (=...), and the values for the variables collected from url format. Any sentence that are located before parameters and is being repeated in url format will be considerer as constant.