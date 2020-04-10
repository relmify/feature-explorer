# Domain Driven Design

This application was developed using [Domain Driven Design](https://dddcommunity.org/book/evans_2003/) (DDD). To help clarify my own thoughts, I've written down some of the concepts and how they map to the appication.

## Domains

A *domain* is generically defined as *a specified sphere of activity or knowledge*.

Domains represent the real world problem space.

In the context of software programs:

> Every software program relates to some activity or interest of its user. That
> subject area to which the user applies the program is the domain of the
> software. . . .
>
> The heart of software is its ability to solve domain-related problems for its
> user. All other features, vital though they may be, support this basic
> purpose.
>
> &mdash; Eric Evans, _Domain Driven Deesign: Tackling Complexity in the Heart of Softawre_

The overarching domain of the software can be broken down into multiple sub-domains. A sub-domain is still a domain.

In the context of the overall business or application, not all sub-domains are equal. Sub-domains can be classified as follows:

- *Core*
- *Supporting*
- *Generic*

*Core* subdomains are the subdomains that differentiatiate your application from applications. Core subdomains are the reasons your application exists. They represent the core activities that your application performs, or the core problems that your application is trying to solve. Core subdomains are the areas to be optimized and perfected. Core subdomains are where your complex business logic resides.

*Supporting* subdomains don't offer any competitive edge, but are either necessary in order to implement the core subdomains or they complement the core subdomains with additional "nice to have" functionality. They are specialized enough that no standard off-the-shelf software is available. Supporting subdomains have simpler business logic than core subdomains - focusing - for example - primarily on input validation.

*Generic* subdomains are the things where doing them in the standard way versus some specialized way won't have any significant impact on your business or the value of your application. These are "solved problems" where the solutions are available off the shelf. For example, identity and access management fall into this category for most applications. Of course a company that creates identity and access management solutions would see this differently!

The *domain* of the software is the primary activity that the software enables, or the primary problem that the software is trying to solve.

For Feature Explorer, the core domain - the purpose of the application - can be described as "summarizing and filtering the content and status of feature files within a specified directory". The word "and" clues us into the fact that this domain can be broken down into multiple subdomains:

- Summarizing content
- Summarizing status
- Filtering content
- Filtering status

Since domains and subdomains represent the activities involved in solving problems, they are named using  *gerunds*. A gerund is a verb in its `ing` (present participle) from. It functions as a noun that names an activity rather than naming a person or thing.

## Bounded Contexts

A bounded context defines how a section of the application sees, thinks, and talks about a subject that is important to that section of the application.

Ideally there is one bounded context per subdomain.

Bounded contexts live in the solution space.

If you are familiar with microservices, you can think of a bounded context as (ideally) equivalent to a single microservice.

## Application Services

Application services model busines activities that span bounded contexts.

Application services sit above domain services which sit above aggregates.

Note that application services should never directly interact with domain services. Instead the bounded context can define interfaces which result in calling domain services.

## Services

Bounded contexts present themselves as Services by providing an API to their clients.

## Domain Services

Domain services model business activities within a bounded context.

Domain services are  visible and consumed **only within their own bounded context**. The bounded context might optionally define interfaces that make some or all of its domain services accessible via it's API, but these interfaces may be different from the internal interfaces domain service interfaces.

Domain services sit above the domain aggregates.

## External Services

External services are any services that are external to the bounded context. These could be 3rd party services, or the services provided by other bounded contexts within the same application.

You consume an external services within your bounded context by wrapping it up as if is a domain service.

## Aggregate

Aggregates are concepts made up of entities and value objects.  

Note that ideally you want small aggregates with few entities and value objects. Ideally most aggregates will consist of a single entity.

## Entities

Entities are concepts whose instances are uniquely identifiable. They all have one immutable, read-only aspect or detail that acts as an identifier. We can change any other property but it still remains the same instance.

Entities don't contain other entities but mat express relationships to other entities by ID. 

## Value Objexts

Value objects are concepts that do not have a unique identity. The identity of a value object is determined by all of the values it contains - not by an identifier. For example, a person would be an entity and that person's name would be a value object. If that person changes their name they are still the same person - but they have a new name. 

## Domain Model

> A model is a selectively simplified and consciously structured form of knowledge. An appropriate model makes sense of information and focuses it on a problem.
>
> -- _Eric Evans_

### Domain Modelling

When we design an application using Domain-Driven Design, we are creating a model that attempts to map - with just enough complexity - to the real world problem domain. It uses the same terminology (ubiquitous language) and concepts that domain experts are familiar with in the real world.

Domain Modelling typically starts with a focus on domain events. The next step is to identify what triggers (commands) and activities (behaviors) trigger those events.

### Events

Domain events are the starting point for almost all business processes we want to model.

An event represents something that has already happened.

Events are named in the past tense.

Events can trigger commands, which trigger behaviors (actions), which in term generate additional events.

Since events have already happened, they cannot fail.

### Commands

Commands trigger behaviors (activities).

Commands are always written in the imperative, such as:

- Do X
- Make X happen

Commands can fail.

**Note**: Some people reserve the word "Command" for something that triggers a state change and use the word "Query" for commands that only query the current state. Of course the very act of performing a query normally changes some state in the form of an audit log, so this definition isn't entirely clean or accurate.

### Behaviors

Behaviors are known by many names:

- behavior - anything an entity does involving action and response to stimulation
- activity - a generic term for a process performed inside or outside of the application
- workflow - the sequence of steps involved in moving from the beginning to the end of a working process
- scenario - a sequence of events especially when imagined
- use case - a specific situation in which a product or service could potentially be used
- process - a systematic series of actions directed to some end
- ...

Behaviors represent the work that the system does in response to events. Events are commonly triggered by user actions, but may also  and trigger more events.

Feature Explorer was - of course! - developed using [Behavior Driven Development](BEHAVIOR_DRIVEN_DEVELOPMENT.md) to specify and model the expected behaviors.

**Side Note**: The term "story" or "user story" is sometimes used in teh context of activities or behaviors as well. The word "story" is a bit misleading though. A story is generically defined as "an account of incidents or events" but that's not what a user story is. A user story is more like a request for certain behavior than an account of incidents or events. The typical form of a story - "As a ... I want ... So that ..." makes this clear. Stories are not part of DDD.

### Classification of Feature Explorer Components

#### Core Components

- **Summarizer** - Summarizes the contents and status of the feature files in the specified directory
- **Filterer** - Allows summaries to be filtered based on tags, errors, and warnings
- **Validator** - Validates feature file content with a focus on identifying incomplete content

#### Supportive Components

- **Parser** - Parser wraps the cucumber gherkin parser, mapping to the specific data format expected by downstream services.

### Generic Components

- **Watcher** - Watches the file system. Note that a "file" here is a logical concept. It could be a data structure accessible through some other applications's web API rather than a file on a disk.
- **Configurer** - Configures each of the other bounded contexts.
- **EventStreamer** -  The event streamer wraps rxjs subjects.

## A Note About Terms

Note that I'm using the terms `file` and `directory` in a logical sense - not a literal sense. Anything that behaves like a gherkin file could be substituted. Similarly, any container that holds gherkin files and optionally other such containers can be substituted for a files system directory in the implementation.
