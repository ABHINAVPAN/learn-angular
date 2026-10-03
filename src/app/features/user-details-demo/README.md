# RxJS user-details transfer example

Open any of these routes in the existing Angular app:

- `/rxjs-user-details/subsink`
- `/rxjs-user-details/subscription-array`
- `/rxjs-user-details/take-until-destroyed`

`ComponentOne` sends a typed user-details object through the root-provided `UserDetailsService`. `ComponentTwo` receives it from a plain RxJS `Subject` and demonstrates one subscription cleanup approach at a time. The three routes render the same demo and select the approach through route data.

A plain `Subject` only delivers user details to current subscribers; it does not replay earlier data.
