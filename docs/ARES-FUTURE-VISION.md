# ARES — Future Vision & Interactive Avatar Roadmap

This document records the approved long-term visual and interaction direction for ARES. It is a design/roadmap reference only and does not change the current Phase 1 implementation.

## Approved Visual Direction

- ARES uses a stylized 3D avatar based on the user's provided photo reference, rather than displaying the photo itself.
- The avatar faces straight toward the screen when addressing the user.
- The avatar is positioned at a comfortable distance from the camera/screen, not extremely close to the viewer.
- The avatar wears a black high-collar outfit matching the approved visual direction.
- The environment is an immersive, cinematic winter setting with snowy mountains visible through the scene.
- The interface uses minimal premium glass/transparent UI elements.
- Voice interaction is a primary interaction mode.
- Do not use a reactor/orb-style central UI.
- Do not use a permanent left sidebar.
- Do not use dashboard clutter such as Today's Summary, AI Status, or Quick Actions in the main experience.

## Future Goal: ARES Should Feel Present

The long-term goal is for ARES to feel like a real person inhabiting the environment, rather than a static avatar inside a webpage.

During a conversation, ARES should eventually be able to:

- Sit naturally on a sofa while idle or during parts of a conversation.
- Stand and move around the environment.
- Walk toward a glass window or other meaningful location.
- Perform natural, context-appropriate actions while the user is speaking.
- Look toward the user/camera when listening.
- Face the user when giving an important response.
- Use natural body movement and gestures while speaking.
- Use facial expressions and realistic lip-sync while responding.
- Change position or activity without making the interaction feel scripted.

## Cinematic Camera Behavior

The camera should participate in the conversation rather than remaining fixed at all times.

Examples:

1. ARES is sitting on the sofa while the user begins speaking.
2. ARES turns his attention toward the user while listening.
3. During thinking/planning, ARES may stand or walk naturally through the environment.
4. When ARES begins an important response, the camera can smoothly move toward or frame him more closely.
5. During longer responses, the camera can use subtle cinematic movement while keeping ARES visible.
6. After the response, the camera can return to a wider environmental view.

Camera movement must remain subtle and conversational, not distracting.

## Future Technical Architecture

When the project reaches the immersive-avatar phase, the frontend should support:

- A real-time 3D character model.
- A rigged character skeleton.
- Reusable idle, sitting, standing, walking, turning, looking, and gesture animations.
- Facial animation and expressions.
- Lip-sync driven by ARES speech output.
- A persistent 3D virtual environment.
- Environmental objects and interaction points such as a sofa, window, desk, and room areas.
- A cinematic camera system.
- State-driven character behavior.
- Voice input and speech output.
- ARES Brain control over high-level behavior and scene actions.

## ARES Behavioral Model

The future interaction pipeline should evolve toward:

```text
User speaks
    ↓
Speech recognition
    ↓
ARES Brain
    ↓
Understand context + intent
    ↓
Decide response + appropriate behavior
    ↓
Character animation + camera direction
    ↓
Speech generation
    ↓
Lip-sync + facial expression
    ↓
ARES responds naturally
```

ARES should eventually decide not only **what to say**, but also **how to behave while saying it**.

Example behavior output concept:

```text
Response:
"You should focus on your project first."

Behavior:
- walk_to_window
- turn_toward_user
- speak
- camera = medium_closeup
```

This behavior format is a future concept and is not part of the current Phase 1 implementation.

## Development Principle

Build toward the experience incrementally:

1. Establish the approved visual environment and avatar direction.
2. Add the 3D character and environment.
3. Add character rigging and basic animation states.
4. Add voice interaction and lip-sync.
5. Add cinematic camera behavior.
6. Connect ARES Brain decisions to character behavior.
7. Expand natural actions and environmental interactions.

The existing ARES backend and current project structure should remain untouched while this document serves as the future design reference unless a later phase explicitly requires architectural changes.
