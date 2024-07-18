# DJS03 Project Brief: Book Connect - Abstractions

## Codebase Overview

This codebase consists of JavaScript functions and event handlers for a book preview and search functionality on a web page. It includes functions to render book previews, search for books based on filters, display book information, handle theme settings, and show more results.

## functioality

The Javascript Functionality allows users to:

View book previews with author information.
Search for books based on genres, authors, and titles.
Display detailed information about selected books.
Toggle between light and dark themes.
For a detailed understanding of each function and its usage, refer to the code comments and function descriptions.

#### Discussion and Reflection

- The rationale behind the refactoring decisions made, including the choice of objects and functions.

The rationale behind the refactoring decisions made in the "Book Connect" project is to enhance maintainability and readability by applying concepts of objects and functions for abstraction.

1. Objects: Objects were defined to represent key elements of the application, such as books, authors, and genres. This choice was made to organize and encapsulate related data and functionality into logical units, making the code more modular and easier to understand. By utilizing objects, the code becomes more scalable and flexible, allowing for easier modifications and additions in the future.

2. Functions: Functions were created to handle repetitive tasks, such as rendering the book list, handling user interactions, and applying filters. This decision was made to improve code reuse, readability, and maintainability. By breaking down the code into smaller, reusable functions, developers can easily modify or extend specific functionalities without affecting the entire codebase.

- Abstraction has made the code more maintainable and extendable.

1. Encapsulation: By encapsulating related data and functionality within objects, abstraction helps to hide implementation details and provide a clear interface for interacting with the objects. This encapsulation promotes modularity and separation of concerns, making it easier to modify or replace specific components without affecting the rest of the codebase.

2. Abstraction of Behavior: By defining functions or methods within objects, abstraction allows for the encapsulation of specific behaviors or operations. This abstraction promotes code reusability, as different objects can utilize the same functions or methods without duplicating code. This makes it easier to modify or extend the behavior of objects without affecting other parts of the codebase.

3. Hiding Implementation Details: Abstraction helps to hide implementation details, such as the internal workings of objects or the specific algorithms used. This abstraction promotes code readability and maintainability, as developers can focus on the high-level logic and interactions without being overwhelmed by implementation details.

- Any challenges faced during the refactoring process and how they were overcome.

1. Refactoring code snippets by grouping them into a function withouut breaking the app
   Overcame this by firstly understading the otiginal code snippet and rewriting smaller sections that can be refactored before encapsulating everything.

2. Figuring out which functions should be encapsulated.
   Overcamee this by commeting out blocks of the codebase to figure out which functions handled what functionality.

- Reflections on how this exercise has deepened your understanding of JavaScript programming concepts.

1. Training me to identify when code is being repetitive and how to take that repetitive code and encapsulate it into a fucntion that can just be called again without having to repeate the entire code.

2. The importantance of grouping functions that perform certain things into one grouping for readability and also the heirachy of function grouping within a codebase.

3. How to refactor code into something more readable and less clunky.
