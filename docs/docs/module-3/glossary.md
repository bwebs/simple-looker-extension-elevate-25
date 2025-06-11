# Debouncing Input Values

## What is Debouncing?

Debouncing is a programming practice that limits the rate at which a function can fire. In the context of input values, debouncing helps prevent excessive processing or API calls when a user is typing or interacting with an input field.

For example, without debouncing, if a user types "hello" quickly, each keystroke might trigger an API call or expensive computation. With debouncing, we wait until the user stops typing for a specified period before executing the action.

## Using useDebounceValue Hook

The `useDebounceValue` hook from `usehooks-ts` provides an elegant way to implement debouncing in React components. Here's how to use it:

```typescript
import { useDebounceValue } from "usehooks-ts";

function SearchComponent({ defaultValue = "John" }) {
  const [debouncedValue, setValue] = useDebounceValue(defaultValue, 500);

  return (
    <div>
      <p>Debounced value: {debouncedValue}</p>
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}
```

### Key Features

1. **Simple API**: Returns a tuple with the debounced value and setter function
2. **Configurable Delay**: Set your preferred debounce delay in milliseconds (defaults to 500ms)
3. **TypeScript Support**: Fully typed with TypeScript
4. **Flexible Options**: Supports various configuration options

### Advanced Usage with Options

```typescript
const [debouncedValue, setValue] = useDebounceValue(initialValue, 1000, {
  leading: false, // Whether to update on the leading edge
  trailing: true, // Whether to update on the trailing edge
  maxWait: 2000, // Maximum time to wait before updating
  equalityFn: (left, right) => left === right, // Custom equality function
});
```

### Best Practices

- Use debouncing for:
  - Search inputs
  - Form validation
  - API calls triggered by user input
  - Expensive computations
- Choose an appropriate delay (typically 200-500ms for search inputs)
- Consider using the `maxWait` option to ensure updates don't wait too long
- Use `equalityFn` when dealing with complex objects or custom comparison logic

## Benefits

1. **Performance**: Reduces unnecessary processing and API calls
2. **User Experience**: Provides smoother interaction with input fields
3. **Resource Efficiency**: Minimizes server load and client-side computations
4. **Cost Effective**: Reduces API usage when working with paid services

## Common Use Cases

- Search functionality
- Form validation
- Auto-save features
- Filter operations
- Real-time data updates

## TypeScript Support

The hook is fully typed and supports generic types:

```typescript
// For primitive values
const [debouncedString, setString] = useDebounceValue<string>("", 500);

// For complex objects
interface User {
  id: number;
  name: string;
}

const [debouncedUser, setUser] = useDebounceValue<User | null>(null, 500);
```

# Understanding useEffect Hook

## What is useEffect?

The `useEffect` hook is one of the most commonly used hooks in React for handling side effects in functional components. Before hooks, these kinds of tasks were only possible in class components through lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

## Basic Usage

```typescript
import { useEffect } from "react";

function ExampleComponent() {
  useEffect(
    () => {
      // Side effect code here
      console.log("Effect ran");

      // Optional cleanup function
      return () => {
        console.log("Cleanup ran");
      };
    },
    [
      /* dependencies array */
    ]
  );

  return <div>Example Component</div>;
}
```

### Key Features

1. **Side Effect Management**: Handles operations like:

   - Data fetching
   - DOM manipulation
   - Subscriptions
   - Event listeners
   - API calls

2. **Dependency Array Control**:

   - Empty array `[]`: Runs only once after initial render
   - No array: Runs after every render
   - With dependencies `[value1, value2]`: Runs when dependencies change

3. **Cleanup Function**: Optional return function that runs:
   - Before the effect runs again
   - When the component unmounts

## Common Patterns

### 1. Running Once on Mount

```typescript
useEffect(() => {
  // Code runs once after initial render
}, []);
```

### 2. Running on State/Prop Changes

```typescript
useEffect(() => {
  // Code runs when count changes
}, [count]);
```

### 3. Cleanup Example

```typescript
useEffect(() => {
  const subscription = someAPI.subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## Best Practices

1. **Split Effects**: Use multiple `useEffect` hooks for different concerns
2. **Dependency Management**: Always include all values from the component scope that the effect uses
3. **Cleanup**: Return cleanup functions for subscriptions, timers, and event listeners
4. **Avoid Infinite Loops**: Be careful with dependencies that change on every render

## Common Use Cases

- Data fetching
- Event listener setup/cleanup
- Data manipulation
- Subscriptions
- API calls
- Form validation
- Animation effects

## TypeScript Support

The `useEffect` hook is fully typed in TypeScript:

```typescript
useEffect(() => {
  // TypeScript will infer types from your code
  const fetchData = async () => {
    const response = await fetch("/api/data");
    const data: MyDataType = await response.json();
    // ...
  };

  fetchData();
}, []);
```

## Performance Considerations

1. **Avoid Heavy Computations**: Keep effects lightweight
2. **Use Memoization**: Combine with `useMemo` or `useCallback` when needed
3. **Batch Updates**: React batches state updates in effects
4. **Cleanup Resources**: Always clean up subscriptions and listeners

## Debugging Tips

1. Use the React DevTools to monitor effect runs
2. Add console logs to track effect execution
3. Check dependency arrays for missing or unnecessary dependencies
4. Use the ESLint exhaustive-deps rule to catch dependency issues
